import lang, { GET_VALUE, Lang } from './lang';
import { expect } from 'chai';

describe("lang create", function() {
  it("should return common.login", function () {
    const actual = lang().common.login[GET_VALUE];
    expect(actual).eq("common.login");
  });

  it("should return common.login.roleNotMatch", function () {
    const actual = lang().common.login.roleNotMatch[GET_VALUE];
    expect(actual).eq("common.login.roleNotMatch");
  });

  it("should be of type Lang", function() {
    const actual = lang().common;
    expect(actual).instanceOf(Lang);
  });

});


