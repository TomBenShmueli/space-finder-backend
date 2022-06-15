//import {handler} from '../../services/node-lambda/hello'
import { handler } from "../../services/SpacesTable/Create";

const event = {
  location: "Paris",
};
handler(event as any, {} as any);
