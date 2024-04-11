import { Link } from 'react-router-dom'
import { createGlobalStyle , css, styled } from 'styled-components'


export const GlobalStyleCss = createGlobalStyle`
* {
    zoom: 99%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "poppins", sans-serif;

}

html {
    overflow-x:hidden ;
    overflow-y: scroll;
    background: ${({theme})=>theme.background};
    color: ${({theme})=>theme.color};

&::-webkit-scrollbar {
    width: 1.2em;
    height: auto;
}
&::-webkit-scrollbar-track {
    background: ${({theme})=>theme.background === dark.background ? '#1e1e1e' : '#f3f5f9'} ;

}
&::-webkit-scrollbar-button {
    background: ${({theme})=>theme.color === dark.color ? '#101010' : '#d5d5d5'} ;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(96, 96, 96)'><polygon points='50,00 0,50 100,50'/></svg>");

}
&::-webkit-scrollbar-button:single-button:vertical:decrement {
    height: auto;
    width: 8px;
    background-position: center 8px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='gray'><polygon points='50,00 0,50 100,50'/></svg>");
    background-repeat: no-repeat;
    background-size: 12px;
}


&::-webkit-scrollbar-button:single-button:vertical:increment {
    height: auto;
    width: 8px;
    background-position: center 8px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='gray'><polygon points='0,0 100,0 50,50'/></svg>");
    background-repeat: no-repeat;
    background-size: 12px;
    
}


&::-webkit-scrollbar-button:single-button:vertical:decrement:active {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(255, 255, 255)'><polygon points='50,00 0,50 100,50'/></svg>");
    background-color: rgb(128, 128, 128);
}

&::-webkit-scrollbar-button:single-button:vertical:increment:active {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(255,255,255)'><polygon points='0,0 100,0 50,50'/></svg>");
    background-color: rgb(128, 128, 128);
}

&::-webkit-scrollbar-button:single-button:vertical:decrement:hover {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(255,255,255)'><polygon points='50,00 0,50 100,50'/></svg>");
} 

&::-webkit-scrollbar-thumb:active {
    background-color: rgb(128, 128, 128);
}

&::-webkit-scrollbar-thumb {
    background: ${({theme})=>theme.color === dark.color ? '#585858' : '#d5d5d5'} ;
    border-top: .5px solid ${({theme})=>theme.background};
    border-bottom: .5px solid ${({theme})=>theme.background};
}
}

`

export const dark = {
    background : "#101010",
    color : "#f3f5f7 "
}

const light = {
    background : "#fff",
    color : "#000"
}



const size = {
    xs: '400px', // for small screen mobile
    sm: '600px', // for mobile screen
    md: '900px', // for tablets
    lg: '1280px', // for laptops
    xl: '1440px', // for desktop / monitors
    xxl: '1920px', // for big screens
  }


const sharedProps = css`
display: ${({$display})=>$display};
justify-content: ${({$jc})=>$jc};
align-items: ${({$ai})=>$ai};
flex-direction: ${({$fd})=>$fd};
flex: ${({$flex})=>$flex};
flex-wrap: ${({$fw})=>$fw};
order : ${({$order})=>$order};
grid-template-columns: ${({$gridTemplateColumns})=>$gridTemplateColumns};
width: ${({$width})=>$width};
max-width: ${({$maxWidth})=>$maxWidth};
min-width: ${({$minWidth})=>$minWidth};
max-height: ${({$maxheight})=>$maxheight};
height: ${({$height})=>$height};
position: ${({$position})=>$position};
z-index: ${({$z})=>$z};
top: ${({$top})=>$top};
left: ${({$left})=>$left};
right: ${({$right})=>$right};
bottom: ${({$bottom})=>$bottom};
transform:${({$transform})=>$transform} ;
padding: ${({$padding})=>$padding};
padding-top: ${({$paddingTop})=>$paddingTop};
padding-right: ${({$paddingRight})=>$paddingRight};
padding-Left: ${({$paddingLeft})=>$paddingLeft};
padding-Bottom: ${({$paddingBottom})=>$paddingBottom};
margin: ${({$margin})=>$margin};
margin-top: ${({$marginTop})=>$marginTop};
margin-right: ${({$marginRight})=>$marginRight};
margin-Left: ${({$marginLeft})=>$marginLeft};
margin-Bottom: ${({$marginBottom})=>$marginBottom};
text-align: ${({$ta})=>$ta};
text-decoration: ${({$td})=>$td};
font-size: ${({$fs})=>$fs};
font-weight: ${({$fw})=>$fw};
color: ${({$color})=>$color};
background-color: ${({$bg})=>$bg};
outline: ${({$outline})=>$outline};
border: ${({$border})=>$border};
border-top: ${({$borderTop})=>$borderTop};
border-bottom: ${({$borderBottom})=>$borderBottom};
border-right: ${({$borderRight})=>$borderRight};
border-left: ${({$borderLeft})=>$borderLeft};
border-radius: ${({$br})=>$br};
border-top-left-radius:${({$borderTopLeftRadius})=>$borderTopLeftRadius};
border-top-right-radius:${({borderTopRightRadius})=>borderTopRightRadius} ;
border-bottom-right-radius:${({$borderBottomRightRadius})=>$borderBottomRightRadius} ;
border-bottom-left-radius:${({$borderBottomLeftRadius})=>$borderBottomLeftRadius} ;
box-shadow: ${({$boxShadow})=>$boxShadow};
gap: ${({$gap})=>$gap};
object-fit: ${({$objectfit})=>$objectfit};
resize: ${({$resize})=>$resize};
transition:${({$transition})=>$transition};
text-transform: ${({$textTranform})=>$textTranform};
overflow: ${({$overflow})=>$overflow};
overflow-x: ${({$overflowX})=>$overflowX};
overflow-y: ${({$overflowY})=>$overflowY};
inset: ${({$inset})=>$inset};
&:hover {
    background-color: ${({$bgHover})=>$bgHover};
    cursor: ${({$cursor})=>$cursor};
    opacity: ${({$opacity})=>$opacity};
    color: ${({$colorHover})=>$colorHover};
    scale: ${({$scaleHover})=>$scaleHover};
}


&:focus{  
    border: ${({$borderFocus})=>$borderFocus};
}

&::placeholder{
    color: ${({$placeHolderColor})=>$placeHolderColor};
    font-weight: ${({$placeHolderFontWeight})=>$placeHolderFontWeight};
}
`
export const Container = styled.div`
${sharedProps};
`
export const FlexContainer = styled.div`
${sharedProps};
`

export const Nav = styled.nav`
${sharedProps};
`
export const Header = styled.header`
${sharedProps};
`
export const Div = styled.div`
${sharedProps}
`
export const Section = styled.section`
${sharedProps}
`
export const Form = styled.form`
${sharedProps};
`
export const Input = styled.input`
${sharedProps};
`
export const Label = styled.label`
${sharedProps};
`
export const TextArea = styled.textarea`
${sharedProps} ;
`
export const Title1 = styled.h1`
${sharedProps};
`
export const Title2 = styled.h2`
${sharedProps};
`
export const Title3 = styled.h3`
${sharedProps};
`
export const Title4 = styled.h4`
${sharedProps};
`
export const Title5 = styled.h5`
${sharedProps};
`
export const Title6 = styled.h6`
${sharedProps};
`
export const Text = styled.p`
${sharedProps} ;
`
export const Image = styled.img`
${sharedProps};
`
export const Image2 = styled.img`
${sharedProps}
border: ${({theme})=>theme.color === dark.color ? `.1px solid rgba(255,255,255,0.2)` : null};
`
export const Span = styled.span`
${sharedProps};
`
export const Footer = styled.footer`
${sharedProps};
`
export const Navlink = styled(Link)`
${sharedProps};
color: ${({theme})=>theme};
`
export const Hr = styled.hr`
${sharedProps};
`

export const Button = styled.button`
${sharedProps}
color: ${({theme})=> theme.color};
background-color: ${({theme})=>theme.background};
`

export const Button1 = styled.button`
${sharedProps}
color: ${({theme})=> theme.color};
background-color: ${({theme})=>theme.background};
cursor: pointer;
outline: none;
&:hover {
    background-color: ${({theme})=>theme.background === dark.background ? '#262626' : '#e5e7eb'};
}
&:active {
    scale : 0.9;    
}
`

export const Button2 = styled.button`
${sharedProps}
background: ${({theme})=> theme.color === dark.color ? '#fff': theme.color};
color: ${({theme})=>theme.background };
cursor: pointer;
outline: none;
text-transform: capitalize;
border: ${({theme})=>theme.color === dark.color ? "1px solid #fff" : 'none'};
border-radius:25px ;
font-weight : 600 ;
&:hover {
    transition: all ease-in-out 0.3s;
    opacity: 0.85;
}
`

export const Button3 = styled.button`
${sharedProps}
background: ${({theme})=> theme.background};
color: ${({theme})=>theme.color };
cursor: pointer;
outline: none;
text-transform: capitalize;
border: ${({theme})=> `solid .5px ${theme.color === dark.color ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)" }`};
border-radius:15px ;
font-weight : 600 ;

&:active {
    scale : 0.9;    
}
`

export const Button4 = styled.button`
${sharedProps}
color: ${({theme})=> theme};
background-color: transparent;
cursor: pointer;
outline: none;
&:hover {
    background-color: ${({theme})=>theme.background === dark.background ? '#262626' : '#e5e7eb'};
}
&:active {
    scale : 0.9;    
}
`
export const Button5 = styled.button`
${sharedProps}
color: ${({theme})=> theme};
background-color: transparent ;
cursor: pointer;
outline: none;
border: none;
&:active {
    scale : 0.9;    
}

`



export const ButtonTheme1 = styled.button`
position: relative;
width: 100%;
height: 2.5rem;
font-weight: 600;
background-color: ${({theme})=>theme.background === dark.background ? '#f1f5f9' : '#101010'} ;
color: ${({theme})=>theme.background === dark.background ? '#0A0A0A' : '#f1f5f9' } ;
border-radius: 10px;
cursor: pointer;
outline: none;
border: none;
border-top-left-radius: ${({$right})=>$right ? '15px' : 'none'};
border-bottom-left-radius: ${({$right})=>$right ? '15px' : 'none'};
border-top-right-radius: ${({$left})=>$left ? '15px' : 'none'};
border-bottom-right-radius: ${({$left})=>$left ? '15px' : 'none'};
&:hover {
    opacity: 0.8;
}
`

export const ButtonTheme2 = styled.button`
position: relative;
width: 100%;
height: 2.5rem;
font-weight: 600;
background-color: ${({theme})=>theme.background === dark.background ? '#101010' : '#f1f5f9'} ;
color: ${({theme})=>theme.background === dark.background ?  '#f1f5f9' : '#0A0A0A'} ;
border-radius: 10px;
cursor: pointer;
outline: none;
border: none;
border-top-left-radius: ${({$right})=>$right ? '15px' : 'none'};
border-bottom-left-radius: ${({$right})=>$right ? '15px' : 'none'};
border-top-right-radius: ${({$left})=>$left ? '15px' : 'none'};
border-bottom-right-radius: ${({$left})=>$left ? '15px' : 'none'};
&:hover {
    opacity: 0.8;
}
`

export const DivMenu = styled.span`
${sharedProps};
overflow: hidden;
background-color: ${({theme}) =>(theme.background === dark.background  ?  "#181818" : "#fff")} ;
box-shadow: ${({theme}) =>(theme.background ===dark.background  ?  "rgba(255,255,255, 0.1) 0px 0px 5px,rgba(255,255,255, 0.05) 0px 0px 5px" : "rgba(0, 0, 0, 0.1) 0px 0px 5px,rgba(0, 0, 0, 0.05) 0px 0px 5px" )} ;
`

export const ItemDiv = styled.div`
${sharedProps} ;
transition: all ease-in-out 0.2s;
border-bottom: ${({theme})=> `solid .5px ${theme.color === dark.color ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }`}  ;
&:last-child {
    border-bottom : none ;
}
/* &:hover {
    background-color: ${({theme})=>theme.background === dark.background ? '#262626' : '#e5e7eb'};
} */

`

export const ContainerBorderBottom = styled.div`
${sharedProps} ;
border-bottom: ${({theme})=> `solid .5px ${theme.color === dark.color ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }`}  ;
`