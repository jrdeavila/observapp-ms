import httpClient from "@/interceptors/requestResponseInterceptor";

export const sendDatabaseService: (
  name: string,
  separator: string,
  file: File
) => Promise<void> = async (name, separator, file) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("separator", separator);
  formData.append("file", file);
  await httpClient.post("/l/databases/", formData);
};
