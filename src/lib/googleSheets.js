import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: 'service_account',
    // You'll need to replace these with your actual service account credentials
    // You can get these from the Google Cloud Console
    // Make sure to add the file to .gitignore!
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// The ID of your Google Sheet
const SPREADSHEET_ID = '1Jgvjbgeu7jj4M-rChadXcD1rE5L4iRnnwhs66i3_MUA';

export async function appendToSheet(data) {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Formata as dificuldades selecionadas
    const formattedDifficulties = Array.isArray(data.difficulty) 
      ? data.difficulty.join(', ')
      : data.difficulty || '';

    const values = [
      [
        formattedDate, // Data e hora do envio
        data.instagram || '', // @ do Instagram
        formattedDifficulties, // Dificuldades selecionadas
        data.business || '', // Descrição do negócio
        data.partner || '', // Tem sócio?
        data.ticket || '', // Ticket médio
        data.submittedAt ? new Date(data.submittedAt).toLocaleString('pt-BR') : '' // Data de submissão formatada
      ]
    ];

    // Cabeçalhos da planilha (só serão adicionados se a planilha estiver vazia)
    const headerRow = [
      'Data e Hora',
      'Instagram',
      'Dificuldades',
      'Sobre o Negócio',
      'Possui Sócio?',
      'Ticket Médio',
      'Data de Envio'
    ];

    // Primeiro, verifica se a planilha está vazia
    const { data: sheetData } = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Leads!A1:Z1',
    });

    const response = sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Leads',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: sheetData.values ? values : [headerRow, ...values],
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error appending to sheet:', error);
    return { success: false, error: error.message };
  }
}
