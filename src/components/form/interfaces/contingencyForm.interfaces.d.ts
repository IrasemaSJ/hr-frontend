// values sent in form
export interface CreateContingencyForm {
  date: LibraryDate;
  half_day?: boolean;
  comments?: string;
}

// values sent to api
export interface CreateContingencyApi {
  date: string;
  half_day?: boolean;
  comments?: string;
}
