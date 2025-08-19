import { NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/googleSheets';

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
    const result = await appendToSheet(data);
    
    if (!result.success) {
      console.error('Erro ao salvar no Google Sheets:', result.error);
      throw new Error('Erro ao salvar os dados');
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
