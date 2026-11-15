import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PixelSprite } from './pixel/pixel-sprite';
import { ProjectCard } from './project-card/project-card';
import { S3Demo } from './s3-demo/s3-demo';
import { LIKES, PROJECTS, TECH_GROUPS } from './portfolio.data';

@Component({
  imports: [PixelSprite, ProjectCard, S3Demo],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly likes = LIKES;
  protected readonly techGroups = TECH_GROUPS;
  protected readonly projects = PROJECTS;
  protected readonly techCount = TECH_GROUPS.reduce((n, g) => n + g.techs.length, 0);
  protected readonly deviconUrl = 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/';
  protected readonly simpleIconsUrl = 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/';

  /** Formato del marcador: dos dígitos, como en un arcade. */
  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
