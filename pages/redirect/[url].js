import dbConnect from "../../db/lib/dbConnect";
import Url from "../../db/models/urls";

export default function url() {
  return <h1>REDIRECTING...</h1>;
}

export async function getServerSideProps(context) {
  const { params } = context;
  await dbConnect();
  try {
    let doc = await Url.findOne({ shortURL: params.url }).lean();
    doc.createdAt = doc.createdAt.toString();
    doc.expiresAt = doc.expiresAt.toString();
    if (doc)
      return {
        redirect: {
          permanent: false,
          destination: doc.url,
        },
        props: {},
      };
    else
      return {
        notFound: true,
      };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
