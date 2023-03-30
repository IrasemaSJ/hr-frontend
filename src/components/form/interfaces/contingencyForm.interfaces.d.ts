// values sent in form
export interface CreateContingencyForm {
  date: LibraryDate;
  comments?: string;
}

// values sent to api
export interface CreateContingencyApi {
  date: string;
  comments?: string;
}
