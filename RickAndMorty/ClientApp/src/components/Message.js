import { Alert, AlertTitle } from "@mui/material";

const Message = ({ title, message, severity }) => {

    return (
        <Alert
            className="absolute right-5 top-5 w-96 text-wrap ease-in-out duration-300"
            severity={severity}>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    )
}

export default Message;