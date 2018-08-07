import lang, { GET_VALUE, Lang } from './lang';
import { expect } from 'chai';

function expectEq(actual, expected) {
  expect(actual[GET_VALUE]).eq(expected);
}

describe("lang create", function() {
  it("should return common.login", function () {
    const actual = lang().common.login;
    expectEq(actual,"common.login");
  });

  it("should return common.login.roleNotMatch", function () {
    const actual = lang().common.login.roleNotMatch;
    expectEq(actual,"common.login.roleNotMatch");
  });

  it("should be of type Lang", function() {
    const actual = lang().common;
    expect(actual).instanceOf(Lang);
  });
  it("should be immutable", function() {
    const base = lang().common;
    const actual1 = base.loading;
    const actual2 = base.login.needLogin;
    expectEq(actual1, "common.loading");
    expectEq(actual2, "common.login.needLogin");
  })

});


