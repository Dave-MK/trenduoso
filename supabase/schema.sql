-- Run this in the Supabase SQL editor after creating your project

-- Profiles (extends auth.users)
create table profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  username     text unique,
  display_name text,
  xp           integer default 0,
  streak       integer default 0,
  last_active  date,
  plan         text default 'free' check (plan in ('free', 'pro', 'annual')),
  created_at   timestamptz default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Courses
create table courses (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  track       text not null check (track in ('foundations','technical','fundamental','risk','strategy')),
  description text,
  order_index integer not null,
  is_free     boolean default false,
  lesson_count integer default 0,
  hours       numeric(4,1) default 0
);

-- Lessons
create table lessons (
  id          uuid primary key default gen_random_uuid(),
  course_id   uuid references courses(id) on delete cascade,
  slug        text not null,
  title       text not null,
  order_index integer not null,
  type        text not null check (type in ('video','reading','canvas_exercise')),
  content     jsonb,
  xp_value    integer default 50,
  unique(course_id, slug)
);

-- User progress
create table user_progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references profiles(id) on delete cascade,
  lesson_id    uuid references lessons(id) on delete cascade,
  completed    boolean default false,
  score        integer,
  attempts     integer default 0,
  completed_at timestamptz,
  unique(user_id, lesson_id)
);

-- Achievements
create table achievements (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references profiles(id) on delete cascade,
  type       text not null,
  awarded_at timestamptz default now()
);

-- Row Level Security
alter table profiles enable row level security;
alter table user_progress enable row level security;
alter table achievements enable row level security;

create policy "Users can read own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can read own progress"
  on user_progress for select using (auth.uid() = user_id);

create policy "Users can write own progress"
  on user_progress for insert with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on user_progress for update using (auth.uid() = user_id);

create policy "Users can read own achievements"
  on achievements for select using (auth.uid() = user_id);

-- Courses and lessons are public
create policy "Courses are public"
  on courses for select using (true);

create policy "Lessons are public"
  on lessons for select using (true);
