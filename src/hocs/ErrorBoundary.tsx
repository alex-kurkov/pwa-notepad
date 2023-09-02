import { Button, Title } from '@mantine/core';
import React, { Component, ErrorInfo, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
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
      <ErrorMessage message={this.state.message} />;
    }
    return this.props.children;
  }
}

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  const navigate = useNavigate();
  return (
    <>
      <Title order={3}>Something went wrong... {message}</Title>;
      <Button onClick={() => navigate(-1)}>GO BACK</Button>
    </>
  );
};
