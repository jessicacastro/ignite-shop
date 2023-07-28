import ReactLoading from 'react-loading'
import { LoadingContainer } from './loading'

interface LoadingProps {
  height?: number
  maxWidth?: number
  spinnerColor?: string
}

export const Loading = ({ height, maxWidth, spinnerColor }: LoadingProps) => (
  <LoadingContainer 
    css={{
      $$height: height ?? 500,
      $$maxWidth: maxWidth ?? 1180
    }}
  >
    <ReactLoading type="spin" color={spinnerColor ?? '#fff'} height={50} width={50} />
    <p>Carregando...</p>
  </LoadingContainer>
)