import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const Protected = ({ component: Component, ...rest }) => {
  const loggedInState = useSelector((state) => state.user.value.isLoggedIn);

  return (
    <>
      {loggedInState ? (
        <Route
          {...rest}
          render={(props) => {
            return <Component {...props} />;
          }}
        />
      ) : (
        <Route
          {...rest}
          render={(props) => {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }}
        />
      )}
    </>
  );
};
export default Protected;
