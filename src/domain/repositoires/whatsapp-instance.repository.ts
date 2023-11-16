export interface WhatsappInstanceRepository<T>{
  save(instance: T): Promise<void>;
  delete(key: string): Promise<void>;
  update(instance: T): Promise<void>;
  findByKey(key: string): Promise<T | undefined>;
}