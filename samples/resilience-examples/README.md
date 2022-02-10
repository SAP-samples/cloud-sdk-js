# SAP Cloud SDK for JS Resilience examples

## Description

This folder contains a few simples examples about resilience and the SDK.
The examples are using well established libraries and are tested for you.
They are meant as a blueprint to illustrate how resilience can be achieved, but there are many other ways out there which could be more fitting in your use case.

- In `src/circuit-breaker.ts` the opossum circuit breaker is wrapped around a request.
- In `src/retry.ts` the async-retry wrapper is used to retry failed requests.

There is always a `*.spec.ts` file next to the examples which shows the actual execution and that the libraries show the expected behaviour.
