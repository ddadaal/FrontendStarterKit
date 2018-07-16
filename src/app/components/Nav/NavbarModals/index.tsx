import { UiStore } from "../../../stores/UiStore";
import { observer } from "mobx-react";
import React from "react";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { Inject } from "react.di";


interface NavbarModalsProps {
}

@observer
export class NavbarModals extends React.Component<NavbarModalsProps, any> {

  @Inject uiStore: UiStore;

  loadLoginModal = async () => {
    this.uiStore.setLoginModalLoading(true);
    const Modal = (await import("../../Modals/LoginModal/index")).LoginModal;
    this.uiStore.setLoginModalLoading(false);
    return <Modal/>;
  };

  // loadRegisterModal = async () => {
  //   const ui = this.props[STORE_UI];
  //   ui.startLoadingRegisterModal();
  //   const Modal = (await import(".//RegisterModal")).RegisterModal;
  //   ui.finishedLoadingRegisterModal();
  //   return <Modal/>;
  // };

  render() {
    return <div>
      {this.uiStore.loginModalShown
        ? <AsyncComponent render={this.loadLoginModal}/>
        : null}
    </div>;
  }
}

