// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anthropic from '@anthropic-ai/sdk';
import { Response } from 'node-fetch';

const client = new Anthropic({
  apiKey: 'my-anthropic-api-key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource messages', () => {
  test('create: only required params', async () => {
    const responsePromise = client.messages.create({
      max_tokens: 1024,
      messages: [{ content: 'Hello, world', role: 'user' }],
      model: 'claude-3-5-sonnet-20241022',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.messages.create({
      max_tokens: 1024,
      messages: [{ content: 'Hello, world', role: 'user' }],
      model: 'claude-3-5-sonnet-20241022',
      metadata: { user_id: '13803d75-b4b5-4c3e-b2a2-6f21399b021b' },
      stop_sequences: ['string', 'string', 'string'],
      stream: false,
      system: [{ text: "Today's date is 2024-06-01.", type: 'text' }],
      temperature: 1,
      tool_choice: { type: 'auto', disable_parallel_tool_use: true },
      tools: [
        {
          input_schema: {
            type: 'object',
            properties: {
              location: { description: 'The city and state, e.g. San Francisco, CA', type: 'string' },
              unit: { description: 'Unit for the output - one of (celsius, fahrenheit)', type: 'string' },
            },
          },
          name: 'x',
          description: 'Get the current weather in a given location',
        },
        {
          input_schema: {
            type: 'object',
            properties: {
              location: { description: 'The city and state, e.g. San Francisco, CA', type: 'string' },
              unit: { description: 'Unit for the output - one of (celsius, fahrenheit)', type: 'string' },
            },
          },
          name: 'x',
          description: 'Get the current weather in a given location',
        },
        {
          input_schema: {
            type: 'object',
            properties: {
              location: { description: 'The city and state, e.g. San Francisco, CA', type: 'string' },
              unit: { description: 'Unit for the output - one of (celsius, fahrenheit)', type: 'string' },
            },
          },
          name: 'x',
          description: 'Get the current weather in a given location',
        },
      ],
      top_k: 5,
      top_p: 0.7,
    });
  });
});

test('create: warns when using a deprecated model', async () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

  await client.messages.create({
    max_tokens: 1024,
    messages: [{ content: 'Hello, world', role: 'user' }],
    model: 'claude-instant-1.2',
  });

  expect(consoleSpy).toHaveBeenCalledWith(
    "The model 'claude-instant-1.2' is deprecated and will reach end-of-life on November 6th, 2024\n" +
      'Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.',
  );

  consoleSpy.mockRestore();
});

test('create: does not warn for non-deprecated models', async () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

  await client.messages.create({
    max_tokens: 1024,
    messages: [{ content: 'Hello, world', role: 'user' }],
    model: 'claude-3-5-sonnet-20240620',
  });

  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
