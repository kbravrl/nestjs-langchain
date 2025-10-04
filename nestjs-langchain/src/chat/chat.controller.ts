import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {} 

  @Post()
  @UsePipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }))

  async handleChat(@Body() dto: ChatDto) {                
    const text = await this.chatService.ask(dto.prompt);
    return { text };
  }

}