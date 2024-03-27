import { Link } from 'react-router-dom'
import { createGlobalStyle , css, styled } from 'styled-components'


export const GlobalStyleCss = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "poppins", sans-serif;
}

html {
    scroll-behavior: smooth;
    background: ${({theme})=>theme.background};
    color: ${({theme})=>theme.color};
    
}

`

const dark = {
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
margin: ${({$margin})=>$margin};
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

&:active{ 
    color :${({$active})=>$active} ;
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
export const Span = styled.span`
${sharedProps};
`
export const Footer = styled.footer`
${sharedProps};
`
export const Navlink = styled(Link)`
${sharedProps};
`
export const Hr = styled.hr`
${sharedProps};
`

export const Button = styled.button`
${sharedProps}
`

export const Button1 = styled.button`
${sharedProps}
color: ${({theme})=> theme.color};
background-color: ${({theme})=>theme.background};
cursor: pointer;
outline: none;
&:hover {
    transition: all ease-in-out 0.3s;
    background-color: ${({theme}) =>(theme.background === dark.background  ?  "#3f3f46" : "#e1e1e1")}
}
`

export const Button2 = styled.button`
${sharedProps}
background: ${({theme})=> theme.color === dark.color ? '#fff': theme.color};
color: ${({theme})=>theme.background };
cursor: pointer;
outline: none;
border: ${({theme})=>theme.color === dark.color ? "1px solid #fff" : null};
border-radius:15px ;
&:hover {
    transition: all ease-in-out 0.3s;
    /* opacity: 0.8; */
}
`

export const Button3 = styled.button`
${sharedProps}
background: ${({theme})=> theme.background};
color: ${({theme})=>theme.color };
cursor: pointer;
outline: none;
/* border: ${({theme})=>theme.color === dark.color ? "1px solid #fff" : null}; */
border-radius:15px ;
&:hover {
    transition: all ease-in-out 0.3s;
    /* opacity: 0.8; */
}
`


export const DivMenu = styled.span`
${sharedProps};
background-color: ${({theme}) =>(theme.background === dark.background  ?  "#181818" : "#fff")} ;
box-shadow: ${({theme}) =>(theme.background ===dark.background  ?  "rgba(255,255,255, 0.05) 0px 0px 10px,rgba(255,255,255, 0.05) 0px 0px 10px" : "rgba(0, 0, 0, 0.05) 0px 0px 10px,rgba(0, 0, 0, 0.05) 0px 0px 10px" )} ;
`


