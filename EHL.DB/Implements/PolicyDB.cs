using Dapper;
using EHL.Common.Models;
using EHL.DB.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EHL.DB.Implements
{
	public class PolicyDB : BaseDB, IPolicyDB
	{
		public PolicyDB(IConfiguration configuration) : base(configuration)
		{

		}

		public List<Policy> GetAllPolicyByWing(long wingId)
		{
			string query = string.Format(@"select * from policy where wingid = @wingid and isactive = 1");
			return connection.Query<Policy>(query, new { wingid = wingId }).ToList();
		}

		public bool AddPolicy(Policy policy)
		{
			string query = string.Format(@"insert into policy (type,wingid,categoryid,wing,category,remarks,fileid,filepath) values (@type,@wingid,@categoryid,@wing,@category,@remarks,@fileid,@filepath)");
			return connection.Execute(query, policy) > 0;
		}

		public List<Policy> GetAdvisioriesByWing(long wingId, string Type)
		{
			string query = string.Format(@"select * from policy where wingid = @wingid and type=@type and isactive = 1");
			return connection.Query<Policy>(query, new { wingid = wingId,type=Type }).ToList();
		}
	}
}
