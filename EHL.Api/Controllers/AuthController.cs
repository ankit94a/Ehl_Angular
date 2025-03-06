using EHL.Api.Authorization;
using EHL.Business.Interfaces;
using EHL.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace EHL.Api.Controllers
{
	[Route("api/[controller]")]
	public class AuthController : ControllerBase
	{
		private readonly IUserManager _userManager;
		readonly IJwtManager _jwtManager;
		public AuthController(IUserManager userManager, IJwtManager jwtManager)
		{
			_userManager = userManager;
			_jwtManager = jwtManager;
		}

		[HttpPost, Route("login")]
		public dynamic DoLogin([FromBody] Login login)
		{
			IActionResult response = Unauthorized();
			var user = _userManager.GetUserByEmailPassword(login.UserName, login.Password);
			if (user != null)
			{
				var jwtToken = _jwtManager.GenerateJwtToken(user);
				var model = new
				{
					userName = user.Name,
					roleType = user.RoleType,
					roleId = user.RoleId
				};
				response = Ok(new { token = jwtToken, user = model });
			}
			return response;
		}
	}
}
