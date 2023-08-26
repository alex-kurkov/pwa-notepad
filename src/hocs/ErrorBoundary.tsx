import { Component, ErrorInfo, PropsWithChildren } from 'react';

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<
  PropsWithChildren, State>
 {
  public state: State = {
    hasError: false,
    message: '',
  };

  public static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      message: error.message,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h4>Something went wrong... {this.state.message}</h4>;
    }
    return this.props.children;
  }
}
