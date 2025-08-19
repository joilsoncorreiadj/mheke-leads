import { NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/googleSheets';
import { sendNewLeadEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validação dos campos obrigatórios
    if (!data.instagram) {
      return NextResponse.json(
        { error: 'Instagram é obrigatório' },
        { status: 400 }
      );
    }

    // Salvar no Google Sheets
    const sheetResult = await appendToSheet(data);
    
    if (!sheetResult.success) {
      console.error('Erro ao salvar no Google Sheets:', sheetResult.error);
      throw new Error('Erro ao salvar os dados');
    }

    // Enviar e-mail de notificação
    const emailResult = await sendNewLeadEmail(data);
    console.log('Email result:', emailResult);
    if (!emailResult.success) {
      console.error('Erro ao enviar e-mail:', emailResult.error);
      // Não interrompemos o fluxo se o e-mail falhar, apenas registramos o erro
    }

    return NextResponse.json({
      success: true,
      message: 'Dados salvos com sucesso!',
      data: data
    });

  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { error: 'Método não permitido' },
    { status: 405 }
  );
}
