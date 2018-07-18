import { expect } from "chai";

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("bootstrap", async () => {
  it("must run", () => {
    expect(1).eq(1);
  });
});
