export const PAGE = 0;
export const SIZE = 10;

export class PageData {
  page: number;
  size: number;
  content: [];
  totalElements: number;
}

export class PageRequest {
  page: number;
  size: number;

  constructor(page: number, size: number) {

  }
}

export function of(page: number, size: number) {
  return new PageRequest(page, size);
}
