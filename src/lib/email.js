import { Resend } from 'resend';

// Inicializa o cliente do Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewLeadEmail(leadData) {
  try {
    // Formata as dificuldades para exibição
    const formattedDifficulties = Array.isArray(leadData.difficulty)
      ? leadData.difficulty.join(', ')
      : leadData.difficulty || 'Não informado';

    // Configuração do e-mail
    const { data } = await resend.emails.send({
      from: 'Mheke Bot <onboarding@resend.dev>', // Você pode configurar seu domínio depois
    //   to: 'contatomheke@gmail.com',
    to:process.env.RESEND_API_TO,
      subject: '🎉 Novo Lead no Questionário Mheke!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Novo Lead Cadastrado! 🚀</h2>
          <p>Um novo lead respondeu ao questionário da Mheke. Confira os detalhes abaixo:</p>
          
          <div style="background-color: #F9FAFB; padding: 16px; border-radius: 8px; margin-top: 16px;">
            <p><strong>📱 Instagram:</strong> ${leadData.instagram || 'Não informado'}</p>
            <p><strong>💼 Sobre o Negócio:</strong> ${leadData.business || 'Não informado'}</p>
            <p><strong>🔄 Dificuldades:</strong> ${formattedDifficulties}</p>
            <p><strong>👥 Possui Sócio?</strong> ${leadData.partner || 'Não informado'}</p>
            <p><strong>💰 Ticket Médio:</strong> ${leadData.ticket || 'Não informado'}</p>
          </div>
          
          <p style="margin-top: 24px;">
            <a href="https://docs.google.com/spreadsheets/d/1Jgvjbgeu7jj4M-rChadXcD1rE5L4iRnnwhs66i3_MUA/edit#gid=0" 
               style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Ver Planilha Completa
            </a>
          </p>
          
          <p style="margin-top: 24px; font-size: 12px; color: #6B7280;">
            Este é um e-mail automático, por favor não responda.
          </p>
        </div>
      `,
    });

    // if (error) {
    //   throw new Error(error.message);
    // }

    console.log('E-mail enviado com sucesso!',data);
    return { success: true, messageId: data };
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return { success: false, error: error.message };
  }
}
