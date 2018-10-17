import React from "react";
import lang from "../../internationalization/LocaleStore/lang";
import { EmailValidationRequestReceipt } from "../../models/user/EmailValidation";
import { UserService } from "../../api/UserService";
import { Inject } from "react.di";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { LocaleMessage } from "../../internationalization/components";
interface Props {
  sendDirectly?: boolean;
  onSend(receipt: EmailValidationRequestReceipt): void;
  userToken: string;
}

const root = lang().emailValidationModal;

@observer
export default class SendEmailIndicator extends React.Component<Props, {}> {

  @Inject userService: UserService;

  timer: NodeJS.Timer;

  @observable secondsRemainingForNextSend = 0;

  sendEmail = async () => {
    const res = await this.userService.requestEmailValidation(this.props.userToken);
    // resets the timer
    this.startTimer();
    this.props.onSend(res);
  }

  componentDidMount() {
    if (this.props.sendDirectly) {
      this.sendEmail();
    }
  }

  clearTimer() {
    clearInterval(this.timer);
  }

  @action startTimer() {
    this.secondsRemainingForNextSend = 60;

    this.timer = setInterval(this.tick, 1000);
  }

  @action tick = () => {
    this.secondsRemainingForNextSend--;
    if (this.secondsRemainingForNextSend <= 0) {
      this.clearTimer();
    }

  }

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    return <p>
      {this.secondsRemainingForNextSend === 0
        ? <a onClick={this.sendEmail}><LocaleMessage id={root.sendIndicator.send}/></a>
        : <span>
          <LocaleMessage id={root.sendIndicator.sent}
                         replacements={{seconds: this.secondsRemainingForNextSend}}/>
        </span>
      }
    </p>;
  }
}
