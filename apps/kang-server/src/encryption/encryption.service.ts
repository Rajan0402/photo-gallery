import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;

  constructor() {
    this.key = crypto.scryptSync('secret-key', 'salt', 32);
  }

  encrypt(buffer: Buffer): { iv: string; encryptedData: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(buffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
      iv: iv.toString('hex'),
      encryptedData: encrypted.toString('hex'),
    };
  }

  decrypt(hash: { iv: string; encryptedData: string }): Buffer {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(hash.iv, 'hex'),
    );
    let decrypted = decipher.update(Buffer.from(hash.encryptedData, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted;
  }
}
