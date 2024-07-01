using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRespository : IUserRepository
    {
        private readonly DataContext _db;
        private readonly IMapper _mapper;

        public UserRespository(DataContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _db.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _db.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _db.Users
                .Include(p => p.Photos)
                .ToListAsync();

        }

        public async Task<bool> SaveAllAsync()
        {
            return await _db.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _db.Entry(user).State = EntityState.Modified;
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _db.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await _db.Users
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}