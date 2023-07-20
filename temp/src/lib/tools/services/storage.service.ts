import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
  }

  set(key: string, value: string): void {
    this.storage.set(key, value);
  }

  setStringify(key: string, value: any): void {
    this.set(key, JSON.stringify(value));
  }

  remove(key: string): void {
    this.storage.remove(key);
  }

  async get(key: string): Promise<string | null> {
    return await this.storage.get(key);
  }

  async getParse(key: string): Promise<any | null> {
    const value = await this.get(key);

    if (!value) {
      return null;
    }
    return JSON.parse(value);
  }

  async getObject<T>(key: string): Promise<T | null> {
    return (await this.getParse(key)) as T;
  }
}
