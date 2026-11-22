import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ModeraRede - Debate: Proteção de Menores vs. Censura Indevida',
  description: 'Simulador interativo de moderação de conteúdo nas redes sociais para debates acadêmicos de Tecnologia e Sociedade.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
