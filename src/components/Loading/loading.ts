import { keyframes, styled } from '@stitches/react'

const blink = keyframes({
  '0%': { opacity: 0.2 },
  '20%': { opacity: 1 },
  '100%': { opacity: 0.2 },
})

export const LoadingContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',
  alignItems: 'center', // estica as colunas para terem o mesmo tamanho verticalmente
  justifyContent: 'center',
  height: '$$height',
  maxWidth: '$$maxWidth',
  margin: '0 auto',

  p: {
    fontSize: '$2xl',
    color: '$gray300',
    animation: `${blink} 1s infinite`,
  }
})