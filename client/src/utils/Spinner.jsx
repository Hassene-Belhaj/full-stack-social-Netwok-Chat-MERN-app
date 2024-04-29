import PulseLoader  from "react-spinners/PulseLoader";
import styled from "styled-components";



function Spinner({Size}) {
  return (
          <Div >
                <PulseLoader 
                    loading='true'
                    color="rgba(198, 198, 198, 1)"
                    margin={2}
                    size={Size || 10}
                />
          </Div>
  );
}

export default Spinner;

const Div = styled.div`
display: flex;
justify-content: center;
`