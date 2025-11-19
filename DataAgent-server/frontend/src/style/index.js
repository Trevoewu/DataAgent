// style/index.js
import { useTheme } from 'antd-style'

export const useStyle = () => {
  const { styles } = useTheme(() => ({
    topLinkWrapper: {
      position: 'absolute',
      right: 24,
      top: 8,
      zIndex: 100
    },
    layout: {
      display: 'flex',
      height: '100vh'
    },
    menuPagesWrapper: {
      flex: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    },
    pageWrapper: {
      flex: 1,
      overflowY: 'auto'
    },
    footer: {
      textAlign: 'center'
    }
  }))
  
  return { styles }
}