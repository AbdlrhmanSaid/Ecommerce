import { Heading } from "@components/common";
import { useAppSelector } from "@store/hooks";

const Account = () => {
  const fullInfo = useAppSelector((state) => state.auth.user);

  return (
    <>
      <Heading>Account Info</Heading>
      <ul>
        <li>First Name : {fullInfo?.firstName}</li>
        <li>Last Name : {fullInfo?.lastName}</li>
        <li> Email : {fullInfo?.email}</li>
      </ul>
    </>
  );
};

export default Account;
