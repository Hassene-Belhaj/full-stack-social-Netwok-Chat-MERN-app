import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../Global/GlobalStyle";
import Spinner from "../../utils/Spinner";
import { getProfileAction } from "../../redux/actions/actions";
import UpdateProfilePageItem from "./UpdateProfilePageItem";

const UpdateProfilePage = () => {
  const {authentication: { username },loading_profile,userProfile} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // console.log(loading)
  // console.log(userProfile)

  useEffect(() => {
    dispatch(getProfileAction(username));
  }, []);

  if(loading_profile) return <Container $height='95vh' $display='flex' $ai='center' $jc='center'><Spinner Size={'8px'} /></Container> 
  else {
    return (
      <Container
        $maxWidth="620px"
        $height="100%"
        $padding="4rem 0"
        $display="flex"
        $jc="center"
        $ai="center"
        $margin="auto"
      >
        <UpdateProfilePageItem userProfile={userProfile} />
      </Container>
    );
  }
};

export default UpdateProfilePage;