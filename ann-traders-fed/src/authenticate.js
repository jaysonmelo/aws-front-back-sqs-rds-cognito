import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import userpool from './userpool';

export const authenticate = (Usuario,Password) => {
    return new Promise((resolve,reject)=>{
        var sessionUserAttributes = {};
        const user=new CognitoUser({
            Username:Usuario,
            Pool:userpool
        });

        const authDetails= new AuthenticationDetails({
            Username:Usuario,
            Password
        });

        user.authenticateUser(authDetails,{
            onSuccess:(result)=>{
                console.log("login successful");
                localStorage.setItem("username", result.accessToken.payload.username)
                resolve(result);
            },
            onFailure:(err)=>{
                console.log("login failed",err);
                reject(err);
            },
            newPasswordRequired: function(userAttributes) {
                delete userAttributes.email_verified;
                sessionUserAttributes = userAttributes;
                handleNewPassword("Ibm111..");
            }
        });
        
        function handleNewPassword(newPassword) {
            user.completeNewPasswordChallenge(newPassword, sessionUserAttributes, {
                onSuccess: (result) => {
                  console.log("NEW PASSWORD COMPLETED: ");
                  console.log(result);
                },
                onFailure: (err) => {
                  console.log(err);
                }
            });
        }
    });
    
};

export const logout = () => {
    const user = userpool.getCurrentUser();
    user.signOut();
    localStorage.removeItem("username")
    window.location.href = '/';
};
