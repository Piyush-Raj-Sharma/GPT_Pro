const { registerUser, loginUser } = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const {
      email,
      fullName,
      password,
    } = req.body;

    const { user, accessToken, refreshToken } = await registerUser(
      email,
      fullName,
      password
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "User registered successfully",
      user: {
        email: user.email,
        fullName: user.fullName,
        id: user._id,
      },
    });
  } catch (err) {
    if (err.message === "USER_EXISTS") {
      return res.status(409).json({ message: "User already exists" });
    }
    res.status(500).json({ message: "server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await loginUser(
      email,
      password
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        email: user.email,
        fullName: user.fullName,
        id: user._id,
      },
    });
  } catch (err) {
        if(err.message === "INVALID_USER" || err.message === "INVALID_PASSWORD") {
            return res.status(401).json({message: "Invalid credentials"});
        }
        res.status(500).json({message: "Server error", error: err.message});
  }
};
