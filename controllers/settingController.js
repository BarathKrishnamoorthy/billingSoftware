import Settings from "../models/settings.js";

const createSetting = async (req, res) => {
  try {
    const {
      hotelId,
      companyName,
      gst,
      gstPercentage,
      address,
      discount,
    } = req.body;

    console.log("Incoming data:", req.body);


    let settings = await Settings.findOne({ hotelId });

    if (settings) {

      settings.hotelId = hotelId || settings.hotelId;
      settings.companyName = companyName || settings.companyName;
      settings.gst = gst || settings.gst;
      settings.gstPercentage = gstPercentage || settings.gstPercentage;
      settings.address = address || settings.address;
      settings.discount = discount || settings.discount;

      await settings.save();

      return res.status(200).json({
        message: "Settings updated successfully",
        settings,
      });
    } else {

      settings = new Settings({
        hotelId,
        companyName,
        gst,
        gstPercentage,
        address,
        discount
      });

      await settings.save();

      return res.status(201).json({
        message: "Settings created successfully",
        settings,
      });
    }
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      const errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }
};



const getSettingDetails = async (req, res) => {
  const {id} = req.params;
  try {
    const settingDetails = await Settings.find({hotelId:id});
    res.status(200).json({ success: true, data: settingDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { createSetting, getSettingDetails };
