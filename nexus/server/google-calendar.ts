import { google } from 'googleapis';
import { JWT, OAuth2Client } from 'google-auth-library';

interface CalendarEvent {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  attendeeEmail: string;
  attendeeName: string;
  organizerEmail?: string;
  organizerName?: string;
}

interface AvailableSlot {
  date: string; // YYYY-MM-DD format
  timeSlot: string; // HH:MM-HH:MM format
  available: boolean;
}

interface ExistingEvent {
  start: Date;
  end: Date;
  summary?: string;
}

class GoogleCalendarService {
  private auth: JWT | OAuth2Client | null = null;
  private calendar;
  private isInitialized = false;

  constructor() {
    // Initialize with a default calendar instance that will be updated in initialize()
    this.calendar = google.calendar({ version: 'v3' });
  }

  /**
   * Create a calendar event for a demo booking
   */
  async createDemoEvent(eventData: CalendarEvent): Promise<string | null> {
    // Skip calendar creation if service is not initialized
    if (!this.isInitialized || !this.auth) {
      console.log('Google Calendar service not initialized, skipping calendar event creation');
      return null;
    }

    try {
      // Validate required fields
      if (!eventData.summary || !eventData.startDateTime || !eventData.endDateTime) {
        console.error('Missing required fields for calendar event creation:', {
          summary: !!eventData.summary,
          startDateTime: !!eventData.startDateTime,
          endDateTime: !!eventData.endDateTime
        });
        return null;
      }

      // Extract contact info for better event creation (opportunistic)
      const contact = this.extractContactFromNotes(eventData.description);
      
      if (!contact?.email && !eventData.attendeeEmail) {
        console.log('No valid email found in either contact parsing or eventData for calendar event creation');
        return null;
      }

      // Calculate end time based on demo type
      const startTime = new Date(eventData.startDateTime);
      const endTime = new Date(eventData.endDateTime);
      
      // Validate dates
      if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
        console.error('Invalid date format in calendar event data:', {
          startDateTime: eventData.startDateTime,
          endDateTime: eventData.endDateTime
        });
        return null;
      }

      // Get organizer information
      const organizerEmail = eventData.organizerEmail || process.env.GOOGLE_CALENDAR_ORGANIZER_EMAIL || process.env.GOOGLE_CALENDAR_DELEGATE;
      const organizerName = eventData.organizerName || process.env.GOOGLE_CALENDAR_ORGANIZER_NAME || 'Secretária IA - Nexus Intelligence';
      
      // Build attendees list
      const attendees = [
        {
          email: contact?.email || eventData.attendeeEmail,
          displayName: contact?.name || eventData.attendeeName,
          responseStatus: 'needsAction'
        }
      ];
      
      // Add organizer if different from attendee
      if (organizerEmail && organizerEmail !== (contact?.email || eventData.attendeeEmail)) {
        attendees.push({
          email: organizerEmail,
          displayName: organizerName,
          responseStatus: 'accepted',
          organizer: true
        });
      }

      // Improve summary format
      const improvedSummary = this.formatEventSummary(eventData.summary, contact?.company || '');
      
      // Improve description format
      const improvedDescription = this.formatEventDescription(eventData, contact);

      const event = {
        summary: improvedSummary,
        description: improvedDescription,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'America/Sao_Paulo',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'America/Sao_Paulo',
        },
        attendees: attendees,
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 24 hours before
            { method: 'popup', minutes: 30 }, // 30 minutes before
          ],
        },
        conferenceData: {
          createRequest: {
            requestId: `demo-${Date.now()}`,
            conferenceSolutionKey: {
              type: 'hangoutsMeet'
            }
          }
        },
        // Ensure calendar shows as busy
        transparency: 'opaque',
        // Set event status
        status: 'confirmed'
      };

      console.log('Creating calendar event:', JSON.stringify(event, null, 2));

      const response = await this.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: 'all', // Send email invitations
      });

      // Enhanced validation of event creation
      if (response.data.id) {
        const eventId = response.data.id;
        const meetLink = response.data.conferenceData?.entryPoints?.[0]?.uri;
        const eventLink = response.data.htmlLink;
        
        console.log('Calendar event created successfully:', {
          eventId,
          meetLink: meetLink || 'Google Meet link not created',
          eventLink,
          attendeesCount: response.data.attendees?.length || 0,
          status: response.data.status
        });
        
        // Verify that Google Meet was created if requested
        if (!meetLink) {
          console.warn('Google Meet link was not created for event:', eventId);
        }
        
        return eventId;
      } else {
        console.error('Calendar event creation failed: No event ID returned');
        return null;
      }
    } catch (error: any) {
      console.error('Error creating calendar event:', {
        message: error.message,
        code: error.code,
        status: error.status,
        details: error.details
      });
      
      // Provide specific error messages based on error type
      if (error.code === 401 || error.status === 401) {
        console.error('Authentication failed. Please check Google Calendar API credentials and permissions.');
      } else if (error.code === 403 || error.status === 403) {
        console.error('Insufficient permissions. Please ensure calendar write access is granted.');
      } else if (error.code === 400 || error.status === 400) {
        console.error('Invalid request data. Please check event details:', {
          summary: eventData.summary,
          startDateTime: eventData.startDateTime,
          endDateTime: eventData.endDateTime,
          attendeeEmail: eventData.attendeeEmail
        });
      } else if (error.code === 404 || error.status === 404) {
        console.error('Calendar not found. Please check calendar configuration.');
      } else {
        console.error('Unexpected error creating calendar event:', error);
      }
      
      // Don't throw the error - we want demo booking to succeed even if calendar integration fails
      return null;
    }
  }

  /**
   * Extract contact information from demo notes
   * Expected format: "type - Contato: Nome (email, phone) - Company | Notes"
   */
  private extractContactFromNotes(notes: string): { name: string; email: string; phone: string; company: string } | null {
    // Updated regex to be more flexible
    const contactMatch = notes.match(/Contato:\s*([^(]+)\(([^,]+),?\s*([^)]*)\)\s*(?:-\s*([^|]+))?/i);
    
    if (!contactMatch) {
      console.log('Could not parse contact from notes format. Expected: "Contato: Nome (email, phone) - Company"');
      return null;
    }
    
    const [, name, email, phone, company = ''] = contactMatch;
    
    return {
      name: name?.trim() || '',
      email: email?.trim() || '',
      phone: phone?.trim() || '',
      company: company?.trim() || ''
    };
  }
  
  /**
   * Format event summary to be more professional and informative
   */
  private formatEventSummary(originalSummary: string, company?: string): string {
    // If summary already looks professional, keep it
    if (originalSummary.includes('Demonstração') || originalSummary.includes('Demo')) {
      return company ? `${originalSummary} - ${company}` : originalSummary;
    }
    
    // Otherwise, improve it
    return company ? `Demonstração Secretária IA - ${company}` : 'Demonstração Secretária IA';
  }
  
  /**
   * Format event description with clear contact information and meeting details
   */
  private formatEventDescription(eventData: CalendarEvent, contact: any): string {
    const lines = [];
    
    lines.push('🤖 DEMONSTRAÇÃO SECRETÁRIA IA');
    lines.push('═══════════════════════════════');
    lines.push('');
    
    // Contact Information
    lines.push('👤 INFORMAÇÕES DO CLIENTE:');
    if (contact?.name || eventData.attendeeName) {
      lines.push(`   Nome: ${contact?.name || eventData.attendeeName}`);
    }
    if (contact?.email || eventData.attendeeEmail) {
      lines.push(`   Email: ${contact?.email || eventData.attendeeEmail}`);
    }
    if (contact?.phone) {
      lines.push(`   Telefone: ${contact.phone}`);
    }
    if (contact?.company) {
      lines.push(`   Empresa: ${contact.company}`);
    }
    lines.push('');
    
    // Meeting Details
    lines.push('📅 DETALHES DA REUNIÃO:');
    lines.push(`   Plataforma: Google Meet (link gerado automaticamente)`);
    lines.push(`   Duração: ${this.calculateDuration(eventData.startDateTime, eventData.endDateTime)} minutos`);
    lines.push(`   Tipo: Demonstração personalizada`);
    lines.push('');
    
    // What will be shown
    lines.push('📋 O QUE SERÁ APRESENTADO:');
    lines.push('   • Automação completa do atendimento WhatsApp');
    lines.push('   • Sistema de qualificação inteligente de leads');
    lines.push('   • Agendamento automático e integração com calendário');
    lines.push('   • Relatórios e analytics em tempo real');
    lines.push('   • ROI personalizado para seu negócio');
    lines.push('');
    
    // Instructions
    lines.push('📞 INSTRUÇÕES:');
    lines.push('   • O link do Google Meet será enviado automaticamente');
    lines.push('   • Chegue 2-3 minutos antes do horário agendado');
    lines.push('   • Tenha em mãos informações sobre seu volume atual de leads');
    lines.push('   • Prepare suas dúvidas sobre automação WhatsApp');
    lines.push('');
    
    // Contact for support
    lines.push('🆘 SUPORTE:');
    lines.push('   Em caso de problemas técnicos, entre em contato:');
    lines.push('   • WhatsApp: (11) 9999-9999');
    lines.push('   • Email: suporte@nexusintelligence.com.br');
    lines.push('');
    
    // Add original notes if any additional information
    const originalNotes = eventData.description;
    if (originalNotes && !originalNotes.includes('Demonstração da Secretária IA')) {
      lines.push('📝 OBSERVAÇÕES ADICIONAIS:');
      lines.push(originalNotes);
      lines.push('');
    }
    
    lines.push('───────────────────────────────');
    lines.push('🚀 Secretária IA - Nexus Intelligence');
    lines.push('Automação WhatsApp que converte leads em clientes');
    
    return lines.join('\n');
  }
  
  /**
   * Calculate duration between two datetime strings in minutes
   */
  private calculateDuration(startDateTime: string, endDateTime: string): number {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
  }

  /**
   * Get available time slots for a given date range
   * @param startDate - Start date in YYYY-MM-DD format
   * @param endDate - End date in YYYY-MM-DD format
   * @returns Array of available time slots
   */
  async getAvailableSlots(startDate: string, endDate: string): Promise<AvailableSlot[]> {
    if (!this.isInitialized || !this.auth) {
      console.log('Google Calendar service not initialized, cannot check availability');
      return [];
    }

    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Generate all possible business hour slots
      const allSlots = this.generateBusinessHourSlots(start, end);
      
      // Get existing events for the date range
      const existingEvents = await this.getExistingEvents(start, end);
      
      // Check each slot for availability
      const availableSlots: AvailableSlot[] = allSlots.map(slot => ({
        date: slot.date,
        timeSlot: slot.timeSlot,
        available: !this.hasConflict(slot, existingEvents)
      }));
      
      console.log(`Found ${availableSlots.filter(s => s.available).length} available slots out of ${availableSlots.length} total slots`);
      return availableSlots;
      
    } catch (error: any) {
      console.error('Error checking calendar availability:', error.message);
      return [];
    }
  }

  /**
   * Generate all possible 30-minute slots during business hours (09:00-17:30)
   * Excludes weekends
   */
  private generateBusinessHourSlots(startDate: Date, endDate: Date): AvailableSlot[] {
    const slots: AvailableSlot[] = [];
    const current = new Date(startDate);
    
    // Business hours: 09:00 to 17:30 (last slot starts at 17:00)
    const businessStart = 9; // 9 AM
    const businessEnd = 17; // 5 PM (last slot starts at 17:00, ends at 17:30)
    const slotDuration = 30; // 30 minutes
    
    while (current <= endDate) {
      // Skip weekends
      if (!this.isWeekend(current)) {
        const dateStr = current.toISOString().split('T')[0]; // YYYY-MM-DD
        
        // Generate slots for this day
        for (let hour = businessStart; hour <= businessEnd; hour++) {
          for (let minute = 0; minute < 60; minute += slotDuration) {
            // Skip the last slot if it would go beyond business hours
            if (hour === businessEnd && minute > 0) {
              break;
            }
            
            const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const endMinute = minute + slotDuration;
            const endHour = endMinute >= 60 ? hour + 1 : hour;
            const finalMinute = endMinute >= 60 ? endMinute - 60 : endMinute;
            const endTime = `${endHour.toString().padStart(2, '0')}:${finalMinute.toString().padStart(2, '0')}`;
            
            slots.push({
              date: dateStr,
              timeSlot: `${startTime}-${endTime}`,
              available: true // Will be updated based on conflicts
            });
          }
        }
      }
      
      // Move to next day
      current.setDate(current.getDate() + 1);
    }
    
    return slots;
  }

  /**
   * Check if a date is weekend (Saturday or Sunday)
   */
  private isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  }

  /**
   * Get existing events from Google Calendar for the specified date range
   */
  private async getExistingEvents(startDate: Date, endDate: Date): Promise<ExistingEvent[]> {
    try {
      const timeMin = startDate.toISOString();
      const timeMax = endDate.toISOString();
      
      const response = await this.calendar.events.list({
        calendarId: 'primary',
        timeMin,
        timeMax,
        singleEvents: true,
        orderBy: 'startTime',
      });
      
      const events: ExistingEvent[] = [];
      
      if (response.data.items) {
        for (const event of response.data.items) {
          if (event.start && event.end) {
            // Handle both dateTime and date (all-day events)
            const startTime = event.start.dateTime 
              ? new Date(event.start.dateTime)
              : new Date(event.start.date + 'T00:00:00');
            
            const endTime = event.end.dateTime 
              ? new Date(event.end.dateTime)
              : new Date(event.end.date + 'T23:59:59');
            
            events.push({
              start: startTime,
              end: endTime,
              summary: event.summary
            });
          }
        }
      }
      
      console.log(`Found ${events.length} existing events in the specified date range`);
      return events;
      
    } catch (error: any) {
      console.error('Error fetching existing events:', error.message);
      return [];
    }
  }

  /**
   * Check if a time slot conflicts with existing events
   */
  private hasConflict(slot: AvailableSlot, existingEvents: ExistingEvent[]): boolean {
    // Parse slot time
    const [startTime, endTime] = slot.timeSlot.split('-');
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    // Create Date objects for the slot in São Paulo timezone
    const slotStart = new Date(slot.date + 'T' + startTime + ':00.000-03:00');
    const slotEnd = new Date(slot.date + 'T' + endTime + ':00.000-03:00');
    
    // Check for conflicts with existing events
    for (const event of existingEvents) {
      // Check if there's any overlap
      // Two time ranges overlap if: start1 < end2 && start2 < end1
      if (slotStart < event.end && event.start < slotEnd) {
        console.log(`Conflict found for slot ${slot.date} ${slot.timeSlot} with event: ${event.summary || 'Untitled'}`);
        return true;
      }
    }
    
    return false;
  }

  /**
   * Initialize Google Calendar service with OAuth2 or Service Account authentication
   */
  async initialize() {
    try {
      // Try OAuth2 first (using client credentials)
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      
      if (clientId && clientSecret) {
        console.log('Attempting to initialize Google Calendar with OAuth2 credentials...');
        
        // Create OAuth2 client
        const oauth2Client = new google.auth.OAuth2(
          clientId,
          clientSecret,
          process.env.GOOGLE_OAUTH_REDIRECT_URI || 'http://localhost:5000/auth/google/callback' // redirect URI
        );

        // For server-to-server applications, we need an access token
        // In a production environment, you would store refresh tokens and use them
        // For now, we'll try to use the client credentials flow or require manual authorization
        
        // Check if we have stored refresh token or access token in environment
        const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
        const accessToken = process.env.GOOGLE_ACCESS_TOKEN;
        
        if (refreshToken) {
          oauth2Client.setCredentials({
            refresh_token: refreshToken
          });
          
          try {
            // Test the credentials by getting the access token
            const { credentials } = await oauth2Client.refreshAccessToken();
            oauth2Client.setCredentials(credentials);
            
            this.auth = oauth2Client;
            this.calendar = google.calendar({ version: 'v3', auth: this.auth });
            this.isInitialized = true;
            console.log('Google Calendar service initialized successfully with OAuth2 (refresh token)');
            return true;
          } catch (refreshError: any) {
            console.log('Failed to refresh OAuth2 token:', refreshError.message);
          }
        } else if (accessToken) {
          oauth2Client.setCredentials({
            access_token: accessToken
          });
          
          this.auth = oauth2Client;
          this.calendar = google.calendar({ version: 'v3', auth: this.auth });
          this.isInitialized = true;
          console.log('Google Calendar service initialized successfully with OAuth2 (access token)');
          return true;
        } else {
          console.log('OAuth2 credentials found but no refresh/access token. Manual authorization required.');
          console.log('Visit this URL to authorize the application:');
          const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
              'https://www.googleapis.com/auth/calendar',
              'https://www.googleapis.com/auth/calendar.events'
            ]
          });
          console.log(authUrl);
        }
      }
      
      // Fallback to service account if OAuth2 not available or failed
      const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
      
      if (serviceAccountKey) {
        console.log('Attempting to initialize Google Calendar with Service Account...');
        
        // Parse the service account key
        const key = JSON.parse(serviceAccountKey);
        
        // Create JWT client for service account authentication
        this.auth = new google.auth.JWT({
          email: key.client_email,
          key: key.private_key,
          scopes: [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events'
          ],
          // If you want to impersonate a specific user (domain-wide delegation)
          subject: process.env.GOOGLE_CALENDAR_DELEGATE
        });

        // Authenticate the JWT client
        await this.auth.authorize();

        // Update calendar instance with authenticated client
        this.calendar = google.calendar({ version: 'v3', auth: this.auth });
        
        this.isInitialized = true;
        console.log('Google Calendar service initialized successfully with Service Account');
        return true;
      }
      
      console.log('Google Calendar service: No valid authentication credentials found (OAuth2 or Service Account), calendar integration disabled');
      return false;
      
    } catch (error: any) {
      console.error('Failed to initialize Google Calendar service:', error.message);
      this.isInitialized = false;
      return false;
    }
  }
}

export const googleCalendarService = new GoogleCalendarService();