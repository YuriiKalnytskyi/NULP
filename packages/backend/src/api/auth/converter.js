const registration = {
  post: (user) => {
    return {
      FirstName: user.first_name,
      LastName: user.last_name,
      email: user.email
    };
  }
};

const login = {
  post: (options) => {
    return {
      accessToken: options.access_token,
      refreshToken: options.refresh_token
    };
  }
};

module.exports = {
  registration,
  login
};
