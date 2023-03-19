export default function errorHandlingResponse(error, callback) {
  const message = "Something is goin wrong!";
  if (error.response) {
    switch (statusCode) {
      case 401:
        window.location.href = "/login";
        break;
      default:
        break;
    }
  }
}
