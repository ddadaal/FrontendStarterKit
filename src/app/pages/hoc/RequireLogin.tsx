import React from 'react';
import { observer } from "mobx-react";
import { UserRole } from "../../models/user/User";
import { Inject } from "react.di";
import { UserStore } from "../../stores/UserStore";
import { LocaleMessage } from "../../internationalization/components";

const ID_PREFIX = "common.login.";

/**
 * Marks that the component needs authentication. Authentication will be run before the component is rendered. If authentication succeeded, returns the wrapped component with { token: string, currentRole: UserRole } injected into props. Otherwise, error will be rendered.
 * @param roles Accepted Roles. Empty is considered to accepted all roles.
 */
export function requireLogin(...roles: UserRole[]) {
  return function(WrappedComponent): any {
    class Component extends React.Component {

      @Inject userStore: UserStore;

      render() {

        if (!this.userStore.loggedIn) {
          return <LocaleMessage id={ID_PREFIX+"needLogin"}/>
        }
        if (roles.length >0 && roles.indexOf(this.userStore.user.role) == -1) {
          return <LocaleMessage id={ID_PREFIX+"roleNotMatch"} replacements={{
            
          }}/>;
        }
        return <WrappedComponent {...this.props}
                                 token={this.userStore.token}
                                 currentRole={this.userStore.user.role}
        />;
      }

    }

    return observer(Component);
  }
}

