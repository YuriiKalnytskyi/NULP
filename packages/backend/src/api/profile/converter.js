const profileInfo = {
  get: (user) => {
    return {
      firstName: user.first_name.trim(),
      lastName: user.last_name.trim(),
      email: user.email
    };
  }
};

module.exports = {
  profileInfo
};
