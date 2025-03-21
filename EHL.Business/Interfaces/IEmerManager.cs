using EHL.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EHL.Business.Interfaces
{
	public interface IEmerManager
	{
		public List<EmerModel> GetAllEmer();
		public Task<bool> AddEmer(EmerModel emer);
		public bool UpdateEmer(EmerModel emer);
		public bool DeactivateEmer(long Id);
	}
}
