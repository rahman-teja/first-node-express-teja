import { response } from "../responses";

const buildResponse = (res: any, resp: response) => {
  res.
    status(resp.GetHTTP()).
    json({
      code: resp.GetCode(),
      data: resp.GetData(),
      meta: resp.GetMeta(),
      message: resp.GetMessage(),
    })
}

export default buildResponse