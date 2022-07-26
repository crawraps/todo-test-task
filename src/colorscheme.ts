declare module 'styled-components' {
  interface DefaultTheme extends IColorscheme {}
}

export interface IColorscheme {
  primary: string
  background: string
  text: string
  radius: string
  shadows: string[]
}

export const Colorscheme: IColorscheme = {
  primary: '#356a6f',
  background: '#fff',
  text: '#262626',
  radius: '4px',
  shadows: [
    '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  ],
}
