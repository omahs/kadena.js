import type { PollRequestBody, PollResponse } from '@kadena/types';

import { parseResponse } from './parseResponse';
import { stringifyAndMakePOSTRequest } from './stringifyAndMakePOSTRequest';

import type {
  RequestInit as NodeFetchRequestInit,
  Response as NodeFetchResponse,
} from 'node-fetch';
import fetch from 'node-fetch';

/**
 * Allows polling for one or more transaction results by request key.
 *
 * @param requestBody - The request keys of transactions submitted to the server
 *                      that we want to know the results of.
 *                      Must be non-empty list.
 * @param apiHost - API host running a Pact-enabled server.
 * @return - Array of the transaction results we polled for.
 *            If a transaction is missing, then it might still be in the mempool,
 *            or might have expired.
 */
export function poll(
  requestBody: PollRequestBody,
  apiHost: string,
): Promise<PollResponse> {
  const request: NodeFetchRequestInit =
    stringifyAndMakePOSTRequest<PollRequestBody>(requestBody);
  const response: Promise<NodeFetchResponse> = fetch(
    `${apiHost}/api/v1/poll`,
    request,
  );
  const parsedRes: Promise<PollResponse> = parseResponse(response);
  return parsedRes;
}