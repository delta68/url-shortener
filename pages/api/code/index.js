import dbConnect from "../../../db/lib/dbConnect";
import Urls from "../../../db/models/urls";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  const {
    query: { urls },
    method,
  } = req;
  await dbConnect();
  switch (method) {
    // case "GET" /* Get a model by its ID */:
    //   try {
    //     const pet = await Urls.findById(urls);
    //     if (!pet) {
    //       return res.status(400).json({ success: false });
    //     }
    //     res.status(200).json({ success: true, data: pet });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;
    case "GET" /* Get a model by its urls */:
      try {
        const query = Urls.where({ url: urls });
        query.findOne((err, code) => {
          if (err) res.status(400).json({ success: false });
          if (res) res.status(200).json({ success: true, data: code });
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const pet = await Urls.findByIdAndUpdate(urls, req.body, {
          new: true,
          runValidators: true,
        });
        if (!pet) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: pet });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedPet = await Urls.deleteOne({ _id: urls });
        if (!deletedPet) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        let data = req.body;
        let newUrl = new Urls({
          url: data.url,
          expiresAt: data.expire,
          shortURL: nanoid(8),
        });
        await newUrl.save();
        return res.status(201).json({ success: true, url: newUrl.shortURL });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
