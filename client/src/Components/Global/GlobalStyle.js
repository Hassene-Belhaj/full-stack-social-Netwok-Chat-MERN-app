import { Link } from 'react-router-dom'
import { createGlobalStyle , css, styled } from 'styled-components'


export const GlobalStyleCss = createGlobalStyle`
* {
    zoom: 99%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "poppins", sans-serif;
    scrollbar-color: ${({theme})=>theme.background === dark.background ? '#78716c #181818' : '#181818 : #78716c'} ;
}

html {
    overflow-x:hidden ;
    overflow-y: scroll;
    background: ${({theme})=>theme.background};
    color: ${({theme})=>theme.color};
}
`
export const dark = {
    background : "#101010",
    color : "#f3f5f7 "
}




const sharedProps = css`
width: ${({$width})=>$width};
max-width: ${({$maxWidth})=>$maxWidth};
height: ${({$height})=>$height};
display: ${({$display})=>$display};
flex-direction: ${({$fd})=>$fd};
flex: ${({$flex})=>$flex};
flex-wrap: ${({$fw})=>$fw};
order : ${({$order})=>$order};
justify-content: ${({$jc})=>$jc};
align-items: ${({$ai})=>$ai};
gap: ${({$gap})=>$gap};
padding: ${({$padding})=>$padding};
margin: ${({$margin})=>$margin};
overflow: ${({$overflow})=>$overflow};
overflow-x: ${({$overflowX})=>$overflowX};
overflow-y: ${({$overflowY})=>$overflowY}; 
background-image: ${({$backgroundImage})=>$backgroundImage};
background-position: ${({$backgroundPosition})=>$backgroundPosition};
background-repeat: ${({$backgroundRepeat})=>$backgroundRepeat};
color: ${({$color})=>$color};
background-color: ${({$bg})=>$bg};
position: ${({$position})=>$position};
top: ${({$top})=>$top};
left: ${({$left})=>$left};
right: ${({$right})=>$right};
bottom: ${({$bottom})=>$bottom};
inset: ${({$inset})=>$inset};
transform:${({$transform})=>$transform} ;
grid-template-columns: ${({$gridTemplateColumns})=>$gridTemplateColumns};
min-width: ${({$minWidth})=>$minWidth};
max-height: ${({$maxHeight})=>$maxHeight};
z-index: ${({$z})=>$z};
text-align: ${({$ta})=>$ta};
text-decoration: ${({$td})=>$td};
text-transform: ${({$tt})=>$tt};
font-size: ${({$fs})=>$fs};
font-weight: ${({$fw})=>$fw};
outline: ${({$outline})=>$outline};
border: ${({$border})=>$border};
border-radius: ${({$br})=>$br};
border-top-left-radius:${({$borderTopLeftRadius})=>$borderTopLeftRadius};
border-top-right-radius:${({borderTopRightRadius})=>borderTopRightRadius} ;
border-bottom-right-radius:${({$borderBottomRightRadius})=>$borderBottomRightRadius} ;
border-bottom-left-radius:${({$borderBottomLeftRadius})=>$borderBottomLeftRadius} ;
box-shadow: ${({$boxShadow})=>$boxShadow};
object-fit: ${({$objectfit})=>$objectfit};
resize: ${({$resize})=>$resize};
transition:${({$transition})=>$transition};
cursor: ${({$cursor})=>$cursor};

&:hover {
    background-color: ${({$bgHover})=>$bgHover};
    color: ${({$colorHover})=>$colorHover};
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
color: ${({theme})=>theme.color};
&:hover{
    text-decoration: underline;
    text-underline-offset: 10px;
}

`
export const Hr = styled.hr`
${sharedProps};
`
export const Video = styled.video`
${sharedProps}

`

export const Button = styled.button`
${sharedProps}
color: ${({theme})=> theme.color};
background-color: ${({theme})=>theme.background};
`

export const ButtonUserHeaderSection = styled.button`
flex: 1;
border: ${({theme})=>`1px solid ${theme.background}`};
cursor: pointer;
text-align: center;
font-weight: 600;
color: ${({theme})=>theme.color};
background: ${({theme})=>theme.background};
border-bottom: ${({theme,$active})=> $active ? `1px solid ${theme.color}` :  '1px solid rgba(0,0,0,0)'} ;
`

export const ButtonScaleEffect = styled.button`
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

export const ButtonAuth = styled.button`
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

export const Button6 = styled.button`
${sharedProps}
color: ${({theme})=> theme.color};
background-color: ${({theme})=>theme.background};
cursor: pointer;
outline: none;
border-radius: 15px;
&:hover {
    background-color: ${({theme})=>theme.background === dark.background ? '#262626' : '#e5e7eb'};
}
&:active {
    scale : 0.9;    
}
`


export const ButtonTheme1 = styled.button`
position: relative;
width: 100%;
height: 2.5rem;
padding: 8px;
font-weight: 600;
background-color: ${({theme})=>theme.background === dark.background ?  '#f1f5f9' : '#101010'} ;
color: ${({theme})=>theme.background === dark.background ?  '#0A0A0A' : '#f1f5f9'} ;
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
padding: 8px;
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
`
export const ContainerBorderBottom = styled.div`
${sharedProps} ;
border-bottom: ${({theme})=> `solid .5px ${theme.color === dark.color ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }`}  ;
`

export const InputAuth = styled.input`
padding-left: 3.5rem;
width: 100%;
height: 3rem;
background-color: ${({theme})=>theme.background ==='#101010' ? "#181818" : "#f1f5f9"};
color: ${({theme})=>theme};
outline: none;
border: 3px solid rgba(0,0,0,0);
border-radius: 25px;
&:focus {
 transition: ease-in-out 0.4s;
 border: 3px solid #8b5cf6;
}
&::placeholder{
    font-size: 1rem;
    font-weight: 500;
    color: gray;

}
`
export const InputEditProfile = styled.input`
  padding-left: 3.5rem;
  width: 100%;
  height: 3rem;
  background-color: ${({ theme }) =>
    theme.background === dark.background ? "#101010" : "#f1f5f9"};
  color: ${({ theme }) => theme};
  outline: none;
  border: 3px solid rgba(0, 0, 0, 0);
  border-radius: 10px;
  &:focus {
    transition: ease-in-out 0.4s;
    border: 3px solid #8b5cf6;
  }
  &::placeholder {
    font-size: 1rem;
    font-weight: 500;
    color: gray;
  }
`;


export const Wrapper = styled.section`
width: ${({$width})=>$width};
display: ${({$display})=>$display};
flex-direction: ${({$fd})=>$fd};
justify-content: ${({$jc})=>$jc};
align-items: ${({$ai})=>$ai};
gap: ${({$gap})=>$gap};
margin:${({$margin})=>$margin};
position:${({$position})=>$position};
top: ${({$top})=>$top};
left: ${({$left})=>$left};
transform:${({$transform})=>$transform};
`

export const TextArea = styled.textarea`
width: ${({$width})=>$width};
background-color: ${({$bg})=>$bg} ;
color: ${({theme})=>theme.color};
outline: ${({$outline})=>$outline};
border: ${({theme})=> theme.background === dark.background ?  '2px solid rgba(255,255,255,0.05)' :  '2px solid rgba(0,0,0,0.2)'};
padding: ${({$padding})=>$padding};
height: ${({$height})=>$height};
resize: ${({$resize})=>$resize};
font-size: 1rem;
margin: auto;
border-radius: ${({$borderRadius})=>$borderRadius};
padding: ${({$padding})=>$padding};
&:focus {
    border: ${({theme})=> theme.background === dark.background ?  '2px solid rgba(255,255,255,0.5)' :  '2px solid rgba(0,0,0,0.5)'};
    transition: ease-in-out 0.3s;

}
`